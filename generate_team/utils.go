package main

import (
	"math/rand"
	"sort"
	"fmt"
)


func generateTeams(
        teams []map[string]interface{},
        players []map[string]interface{},
) (data []map[string]interface{}) {
	indexTeam := 0

	listPlayers := make([]map[string]interface{}, len(players))
	copy(listPlayers, players)

	// init data with teams element result

	listTeams := make([][]map[string]interface{}, 2, len(teams))

	numberRoundNumber := getNumberIfRandom(len(listPlayers))
	
	out:
	for index, _ := range players {
		player := choosePlayer(
			listPlayers, index, numberRoundNumber, listTeams, indexTeam,
		)

		listTeams[indexTeam] = append(listTeams[indexTeam], player)  

		// delete player from copy list
		listPlayers = deletePlayer(listPlayers, player["id"].(string))

		
		// break if no player left
		if len(listPlayers) == 0 {
			break out
		}

		// check if pass next team or return to first one
		if indexTeam == len(teams) - 1 {
			indexTeam = 0
		} else {
			indexTeam = indexTeam + 1 
		}
	}
	data = listTeams
	fmt.Println("data : ", data)

    return 
}


func deletePlayer(
	listPlayers []map[string]interface{},
	id string,
) (newSlice []map[string]interface{}){
	for _, player := range listPlayers {
		if player["id"].(string) != id {
			newSlice = append(newSlice, player)	
		}
	}

	return 
}

func sumTeamLevel(listPlayers []map[string]interface{}) (sum float32){
	for _, player := range listPlayers{
		sum += float32(player["level"].(float32))
	}
	return
}

func getLevelTeams(listTeamsComposed [][]map[string]interface{}) (listLevelsTeam []float32) {
	for _, team := range listTeamsComposed{
		sum := sumTeamLevel(team)
		moyTeam := sum / float32(len(listTeamsComposed)) 	
		listLevelsTeam = append(listLevelsTeam, moyTeam)
	}

	return 
}

func separateListPlayers(sortedList []map[string]interface{}) (separatedList [2][]map[string]interface{}){
	median := len(sortedList)/2
	separatedList[0] = sortedList[:median]
	separatedList[1] = sortedList[median+1:]
	return 
}

func sortPlayers(listPlayers []map[string]interface{}) (sortedList []map[string]interface{}){
	sort.Slice(listPlayers,
	func(i, j int) bool {
		return listPlayers[i]["level"].(string) > listPlayers[i]["level"].(string)
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
	listPlayers []map[string]interface{},
	index int,
	numberRoundNumber int,
	listTeams [][]map[string]interface{},
	indexTeam int,
)(player map[string]interface{}){

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
