package main

import (
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

func (a *App) GeneratorFunc(teams []map[string]interface{}, players []map[string]interface{}) (data []map[string]interface{}) {
        data = generateTeams(teams, players)
        return 
}

func (a *App) ClipboardWriteImageFunc(base64Image string) (result bool) {
	result = true

	err := clipboardWriteImage(base64Image)
	if err != nil {
		fmt.Println(err)
		result = false
	}

	return 
}

