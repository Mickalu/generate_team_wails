package main 

type Player map[string] interface{}

type Team map[string] interface{}

type Data struct {
	players []Player
	teams []Team
}

