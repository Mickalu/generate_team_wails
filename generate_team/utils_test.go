package main

import (
	"fmt"
	"slices"
	"testing"
)

func TestDeletePlayer(t *testing.T) {
	player1 := Player{
		"id": "1",
		"username": "lucas",
	}

	player2 := Player{
		"id": "2",
		"username": "lucien",
	}

	listPlayers := []Player{player1, player2}
	listResult := deletePlayer(listPlayers, "2")

	for _, player := range listResult {
		if player["id"] == "2" {
			t.Fatalf("Wrong player deleted")
		}
	}
}

func TestSumTeamLevel(t *testing.T) {
	player1 := Player{
		"id": "1",
		"username": "lucas",
		"level": 3.8,
	}

	player2 := Player{
		"id": "2",
		"username": "lucien",
		"level": 10.00,
	}
	
	listPlayers := []Player{player1, player2}
	result := sumTeamLevel(listPlayers)

	if result != 13.8 {
		t.Fatalf("sum return %f instead of %f", result, 13.8)
	}
}

func TestSeparateListPlayers(t *testing.T) {
	player1 := Player{
		"id": "1",
		"username": "lucas",
		"level": 3.8,
	}

	player2 := Player{
		"id": "2",
		"username": "lucien",
		"level": 10.00,
	}

	player3 := Player{
		"id": "3",
		"username": "Adrien",
		"level": 0.39,
	}

	player4 := Player{
		"id": "4",
		"username": "Hanna",
		"level": 9.99,
	}
	
	listPlayers := []Player{player1, player2, player3, player4}
	listsSeparated := separateListPlayers(listPlayers)

	if len(listsSeparated[0]) != 2{
		fmt.Println(listsSeparated[0])
		t.Fatalf("list 0 go wrong length")
	}

	if len(listsSeparated[1]) != 2{
		fmt.Println(listsSeparated[1])
		t.Fatalf("list 1 go wrong length")
	}

	for _, player := range listsSeparated[0]{
		if !slices.Contains([]string{"1", "2"}, player["id"].(string)) {
			t.Fatalf("list 0 no containt good ids")
			fmt.Println(listsSeparated[0])
		}
	}

	for _, player := range listsSeparated[1]{
		if !slices.Contains([]string{"3", "4"}, player["id"].(string)) {
			t.Fatalf("list 1 no containt good ids")
			fmt.Println(listsSeparated[1])
		}
	}
	
}

func TestsortPlayers(t *testing.T){
	player1 := Player{
		"id": "1",
		"username": "lucas",
		"level": 3.8,
	}

	player2 := Player{
		"id": "2",
		"username": "lucien",
		"level": 10.00,
	}

	player3 := Player{
		"id": "3",
		"username": "Adrien",
		"level": 0.39,
	}

	player4 := Player{
		"id": "4",
		"username": "Hanna",
		"level": 9.99,
	}
	
	listPlayers := []Player{player1, player2, player3, player4}
	sortedList := sortPlayers(listPlayers)

	if sortedList[0]["id"] != "3" {
		t.Fatalf("first elem wrong got %s instead of %s", sortedList[0]["id"], "3")
	}

	if sortedList[1]["id"] != "1" {
		t.Fatalf("second elem wrong got %s instead of %s", sortedList[1]["id"], "1")
	}

	if sortedList[2]["id"] != "4" {
		t.Fatalf("3 elem wrong got %s instead of %s", sortedList[2]["id"], "4")
	}

	if sortedList[3]["id"] != "2" {
		t.Fatalf("last elem wrong got %s instead of %s", sortedList[3]["id"], "2")
	}
		
} 


