package core

import (
	"calculadora/src/core/token_types"
	"errors"
	"strconv"
)

func Parse(tokens []Token) (*AstNode, error) {
	resultado, err := parseExpressao(tokens, 0)
	if err != nil {
		return nil, err
	}
	if resultado.ProximaPosicao < len(tokens) {
		return nil, errors.New(
			"Token inexperado: " +
				tokens[resultado.ProximaPosicao].Lexema +
				".")
	}
	return resultado, nil
}

func parseBase(tokens []Token, i int) (*AstNode, error) {
	if len(tokens) <= i {
		return nil, errors.New("Esperado número ou expressão entre parêntese. Nada encontrado.")
	}
	token := tokens[i]
	if token.Tipo == token_types.NUMERO {
		valor, err := strconv.ParseFloat(token.Lexema, 64)
		if err != nil {
			return nil, err
		}
		return &AstNode{
			Node:           NumeroNode{tipo: token.Tipo, Valor: valor},
			ProximaPosicao: i + 1,
		}, nil
	}
	if token.Tipo == token_types.ABERTURA_DE_PARENTESE {
		resultado, err := parseExpressao(tokens, i+1)
		if err != nil {
			return nil, err
		}
		if len(tokens) <= resultado.ProximaPosicao ||
			tokens[resultado.ProximaPosicao].Tipo != token_types.FECHAMENTO_DE_PARENTESE {
			return nil, errors.New("O parêntese não foi fechado.")
		}
		return &AstNode{Node: resultado.Node, ProximaPosicao: resultado.ProximaPosicao + 1}, nil
	}
	return nil,
		errors.New("Esperado número ou expressão entre parênteses. Encontrado " +
			token.Lexema +
			".")
}

func parseExpressao(tokens []Token, i int) (*AstNode, error) {
	esquerda, err := parseTermo(tokens, i)
	if err != nil {
		return nil, err
	}
	i = esquerda.ProximaPosicao
	for i < len(tokens) && (tokens[i].Tipo == token_types.SOMA ||
		tokens[i].Tipo == token_types.SUBTRACAO) {
		operador := tokens[i]
		direita, err := parseTermo(tokens, i+1)
		if err != nil {
			return nil, err
		}
		esquerda = &AstNode{
			Node: BinarioNode{
				tipo:     operador.Tipo,
				Esquerda: esquerda.Node,
				Direita:  direita.Node,
			},
			ProximaPosicao: direita.ProximaPosicao,
		}
		i = direita.ProximaPosicao
	}
	return esquerda, nil
}

func parseFator(tokens []Token, i int) (*AstNode, error) {
	esquerda, err := parseBase(tokens, i)
	if err != nil {
		return nil, err
	}
	if len(tokens) > esquerda.ProximaPosicao &&
		tokens[esquerda.ProximaPosicao].Tipo == token_types.POTENCIA {
		direita, err := parseFator(tokens, esquerda.ProximaPosicao+1)
		if err != nil {
			return nil, err
		}
		return &AstNode{
			Node: BinarioNode{
				tipo:     tokens[esquerda.ProximaPosicao].Tipo,
				Esquerda: esquerda.Node,
				Direita:  direita.Node,
			},
			ProximaPosicao: direita.ProximaPosicao,
		}, nil
	}
	return esquerda, nil
}

func parseTermo(tokens []Token, i int) (*AstNode, error) {
	esquerda, err := parseFator(tokens, i)
	if err != nil {
		return nil, err
	}
	i = esquerda.ProximaPosicao
	for i < len(tokens) && (tokens[i].Tipo == token_types.MULTIPLICACAO ||
		tokens[i].Tipo == token_types.DIVISAO ||
		tokens[i].Tipo == token_types.RESTO) {
		operador := tokens[i]
		direita, err := parseFator(tokens, i+1)
		if err != nil {
			return nil, err
		}
		esquerda = &AstNode{
			Node: BinarioNode{
				tipo:     operador.Tipo,
				Esquerda: esquerda.Node,
				Direita:  direita.Node,
			},
			ProximaPosicao: direita.ProximaPosicao,
		}
		i = direita.ProximaPosicao
	}
	return esquerda, nil
}
