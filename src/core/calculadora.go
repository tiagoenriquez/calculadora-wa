package core

func Calcular(conta string) (float64, error) {
	tokens, err := Lex(conta)
	if err != nil {
		return 0.0, err
	}
	astNode, err := Parse(tokens)
	if err != nil {
		return 0.0, err
	}
	return Interpretar(astNode)
}
