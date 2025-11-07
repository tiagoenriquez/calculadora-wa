package core

import (
	"calculadora/src/core/token_types"
	"errors"
	"regexp"
)

func Lex(conta string) ([]Token, error) {
	if len(conta) == 0 {
		return []Token{}, errors.New("A expressão matemática não foi informada.")
	}
	tokens := []Token{}
	i := 0
	for i < len(conta) {
		caractere := conta[i]
		if caractere == ' ' {
			i++
			continue
		}
		novoI := conferirCaractere(caractere, &tokens, i)
		if i != novoI {
			i = novoI
			continue
		}
		novoI = conferirNumero(conta, &tokens, i)
		if i != novoI {
			i = novoI
			continue
		}
		novoI = conferirSubtracao(caractere, &tokens, i)
		if i != novoI {
			i = novoI
			continue
		}
		if i == novoI {
			return []Token{}, errors.New(string(caractere) + " não é um caractere válido.")
		}
		i = novoI
	}
	return tokens, nil
}

func conferirCaractere(caractere byte, tokens *[]Token, i int) int {
	switch caractere {
	case '+':
		*tokens = append(*tokens, Token{Lexema: "+", Tipo: token_types.SOMA})
		return i + 1
	case '*':
		*tokens = append(*tokens, Token{Lexema: "*", Tipo: token_types.MULTIPLICACAO})
		return i + 1
	case '/':
		*tokens = append(*tokens, Token{Lexema: "/", Tipo: token_types.DIVISAO})
		return i + 1
	case '%':
		*tokens = append(*tokens, Token{Lexema: "%", Tipo: token_types.RESTO})
		return i + 1
	case '^':
		*tokens = append(*tokens, Token{Lexema: "^", Tipo: token_types.POTENCIA})
		return i + 1
	case '(':
		*tokens = append(*tokens, Token{Lexema: "(", Tipo: token_types.ABERTURA_DE_PARENTESE})
		return i + 1
	case ')':
		*tokens = append(*tokens, Token{Lexema: ")", Tipo: token_types.FECHAMENTO_DE_PARENTESE})
		return i + 1
	}
	return i
}

func conferirNumero(conta string, tokens *[]Token, i int) int {
	match := extrairNumero(conta, i)
	if match != "" &&
		(len(*tokens) == 0 || (*tokens)[len(*tokens)-1].Tipo != token_types.NUMERO) {
		*tokens = append(*tokens, Token{Lexema: match, Tipo: token_types.NUMERO})
		return i + len(match)
	}
	return i
}

func conferirSubtracao(caractere byte, tokens *[]Token, i int) int {
	if caractere == '-' {
		*tokens = append(*tokens, Token{Lexema: "-", Tipo: token_types.SUBTRACAO})
		return i + 1
	}
	return i
}

func extrairNumero(conta string, i int) string {
	re := regexp.MustCompile(`^[-]?\d+(\.\d+)?`)
	trecho := conta[i:]
	return re.FindString(trecho)
}
