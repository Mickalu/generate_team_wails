package main

import (
	"math/rand"
	"sort"
	"fmt"
)


func generateTeams(
        teams []map[string]interface{},
        players []map[string]interface{},
) ([]map[string]interface{}) {
	data := []map[string]interface{}{
        {
            "team":    map[string]interface{}{},
            "players": []map[string]interface{}{},
        },
        {
            "team":    map[string]interface{}{},
            "players": []map[string]interface{}{},
        },

	} 

	indexTeam := 0

	listPlayers := make([]map[string]interface{}, len(players))
	copy(listPlayers, players)

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

	for index, team := range teams {
		data[index]["team"] = team
		data[index]["players"] = listTeams[index]
	}

    return data 
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

func sumTeamLevel(listPlayers []map[string]interface{}) (sum float64){
	for _, player := range listPlayers{
		sum += float64(player["level"].(float64))
	}
	return
}

func getLevelTeams(listTeamsComposed [][]map[string]interface{}) (listLevelsTeam []float64) {
	for _, team := range listTeamsComposed{
		sum := sumTeamLevel(team)
		moyTeam := sum / float64(len(listTeamsComposed)) 	
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
		return listPlayers[i]["level"].(float64) > listPlayers[j]["level"].(float64)
	})

	sortedList = listPlayers
	return 
}

func whichLevelOfPlayer(
	teamLevels []float64,
	indexTeam int,
	separatedList [2][]map[string]interface{},
) int {
	var otherTeamIndex int 

	if len(separatedList[0]) == 0 {
		return 1
	}

	if len(separatedList[1]) == 0 {
		return 0
	}

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
			listOfChoosenPlayers := separatedListPlayers[whichLevelOfPlayer(teamLevels, indexTeam, separatedListPlayers)]
			fmt.Println("listOfChoosenPlayers : ", listOfChoosenPlayers)
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
