package main

import (
	"calculadora/src/core"
	"calculadora/src/models"
	"calculadora/src/responses"
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) Calcular(expressao string) responses.CalculoResponse {
	resultado, erro := core.Calcular(expressao)
	if erro != nil {
		return responses.CalculoResponse{
			Resultado: 0.0,
			Erro:      models.Erro{Mensagem: erro.Error()}}
	}
	return responses.CalculoResponse{Resultado: resultado, Erro: models.Erro{Mensagem: ""}}
}
