package core

type Node interface {
	Tipo() string
}

type BinarioNode struct {
	tipo     string
	Esquerda Node
	Direita  Node
}

func (b BinarioNode) Tipo() string {
	return b.tipo
}

type NumeroNode struct {
	tipo  string
	Valor float64
}

func (n NumeroNode) Tipo() string {
	return n.tipo
}
