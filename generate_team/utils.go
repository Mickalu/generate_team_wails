package main

import (
	"math/rand"
	"sort"
        "fmt"
)

func setData() (data Data) {
	player1 := Player{
		id: 1,
		username: "player1",
		level: 2.75,
	}

	player2 := Player{
		id: 2,
		username: "player2",
		level: 5.00,
	}

	player3 := Player{
		id: 3,
		username: "player3",
		level: 3.89,
	}

	player4 := Player{
		id: 4,
		username: "player4",
		level: 1.3,
	}

	player5 := Player{
		id: 5,
		username: "player5",
		level: 5,
	}

	player6 := Player{
		id: 6,
		username: "player6",
		level: 0.2,
	}

	team1 := Team{name: "team1"}

	team2 := Team{name: "team2"}
	
	data = Data{
		players: []Player{player1, player2, player3, player4, player5, player6},
		teams: []Team{team1, team2},
	}
	 return 
}


func generateTeams() {
	indexTeam := 0

	data := setData()

	listPlayers := make([]Player, len(data.players))
	copy(listPlayers, data.players)

	listTeams := make([][]Player, 2, len(data.teams))

	numberRoundNumber := getNumberIfRandom(len(listPlayers))
	
	out:
	for index, _ := range data.players {
		// append player
		player := choosePlayer(
			listPlayers, index, numberRoundNumber, listTeams, indexTeam,
		)
		listTeams[indexTeam] = append(listTeams[indexTeam], player)  

		// delete player from copy list
		listPlayers = deletePlayer(listPlayers, player.id)

		
		// break if no player left
		if len(listPlayers) == 0 {
			break out
		}

		// check if pass next team or return to first one
		if indexTeam == len(data.teams) - 1 {
			indexTeam = 0
		} else {
			indexTeam = indexTeam + 1 
		}
	}

	fmt.Println(listTeams)
}


func deletePlayer(
	listPlayers []Player,
	id int,
) (newSlice []Player){
	for _, player := range listPlayers {
		if player.id != id {
			newSlice = append(newSlice, player)	
		}
	}

	return 
}

func sumTeamLevel(listPlayers []Player) (sum float32){
	for _, player := range listPlayers{
		sum += float32(player.level)
	}
	return
}

func getLevelTeams(listTeamsComposed [][]Player) (listLevelsTeam []float32) {
	for _, team := range listTeamsComposed{
		sum := sumTeamLevel(team)
		moyTeam := sum / float32(len(listTeamsComposed)) 	
		listLevelsTeam = append(listLevelsTeam, moyTeam)
	}

	return 
}

func separateListPlayers(sortedList []Player) (separatedList [2][]Player){
	median := len(sortedList)/2
	separatedList[0] = sortedList[:median]
	separatedList[1] = sortedList[median+1:]
	return 
}

func sortPlayers(listPlayers []Player) (sortedList []Player){
	sort.Slice(listPlayers,
	func(i, j int) bool {
		return listPlayers[i].level > listPlayers[i].level
	})

	sortedList = listPlayers
	return 
}

func whichLevelOfPlayer(
	teamLevels []float32,
	indexTeam int,
) int {
	var otherTeamIndex int 

	if indexTeam == 1 {
		otherTeamIndex = 0	
	} else {
		otherTeamIndex = 1
	}

	if teamLevels[indexTeam] > teamLevels[otherTeamIndex]{
		return 0 
	} else if teamLevels[indexTeam] < teamLevels[otherTeamIndex] {
		return 1
	} else {
		return rand.Intn(2)
	}
}


func choosePlayer(
	listPlayers []Player,
	index int,
	numberRoundNumber int,
	listTeams [][]Player,
	indexTeam int,
)(player Player){

	if index <= numberRoundNumber {
		indexPlayer := rand.Intn(len(listPlayers))
		player = listPlayers[indexPlayer]

	} else {
		if len(listPlayers) == 1{
			player = listPlayers[0]
		} else {
			teamLevels := getLevelTeams(listTeams)	
			sortedListPlayers := sortPlayers(listPlayers)
			separatedListPlayers := separateListPlayers(sortedListPlayers)
			listOfChoosenPlayers := separatedListPlayers[whichLevelOfPlayer(teamLevels, indexTeam)]
			player = listOfChoosenPlayers[rand.Intn(len(listOfChoosenPlayers))]
		}
	}
	
	return 
}

func getNumberIfRandom(
	lenPlayer int,
)(numberRoundNumber int){
	mid := lenPlayer/2

	if mid%2 != 0 {
		numberRoundNumber = mid - 1
	} else {
		numberRoundNumber = mid
	}

	return 
}
