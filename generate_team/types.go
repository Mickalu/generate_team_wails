package main 

type Player struct {
	id int
	username string
	level float32
}

type Team struct {
	name string
}

type Data struct {
	players []Player
	teams []Team
}

