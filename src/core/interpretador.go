package core

import (
	"calculadora/src/core/token_types"
	"errors"
	"math"
)

func Interpretar(node *AstNode) (float64, error) {
	switch n := node.Node.(type) {
	case NumeroNode:
		return n.Valor, nil
	case BinarioNode:
		esquerda, err := Interpretar(&AstNode{Node: n.Esquerda})
		if err != nil {
			return 0.0, err
		}
		direita, err := Interpretar(&AstNode{Node: n.Direita})
		if err != nil {
			return 0.0, err
		}
		switch node.Node.Tipo() {
		case token_types.SOMA:
			return esquerda + direita, nil
		case token_types.SUBTRACAO:
			return esquerda - direita, nil
		case token_types.MULTIPLICACAO:
			return esquerda * direita, nil
		case token_types.DIVISAO:
			if direita == 0.0 {
				return 0.0, errors.New("Esta calculadora não suporta divisão por zero.")
			}
			return esquerda / direita, nil
		case token_types.RESTO:
			return math.Mod(esquerda, direita), nil
		case token_types.POTENCIA:
			return math.Pow(esquerda, direita), nil
		default:
			return 0.0, errors.New("Operação inválida: " + n.Tipo() + ".")
		}
	default:
		return 0.0, errors.New("Nó inválido")
	}
}
