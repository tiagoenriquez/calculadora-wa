package responses

import "calculadora/src/models"

type CalculoResponse struct {
	Resultado float64
	Erro      models.Erro
}
