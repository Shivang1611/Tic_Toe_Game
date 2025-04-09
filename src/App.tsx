import { SafeAreaView, ScrollView, StyleSheet, Text, View,StatusBar, FlatList, Pressable } from 'react-native'
import React from 'react'
import Snackbar from 'react-native-snackbar'
import Icons from './components/Icons'
import { useState } from 'react'



function App() :JSX.Element {
  const [isCross, setIsCross]=useState<boolean>(false)
  const [gameWinner,setGameWinner]=useState<string>("")

  const [gameState,setGameState]=useState(new Array(9).fill('empty',0,9))

  const reloadGame=()=>{
    setGameState(new Array(9).fill('empty',0,9))
    setGameWinner("")
    setIsCross(false)
  }

  
  const onChangeItem = (itemNumber: number) => {
    if (gameState[itemNumber] === 'empty') {
      const newGameState = [...gameState];
      newGameState[itemNumber] = isCross ? 'cross' : 'circle';
      setGameState(newGameState);
      setIsCross(!isCross);
      checkWinner();
    } else {
      Snackbar.show({
        text: 'Position already filled',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "#FF0000",
        textColor: "#FFFFFF",
      });

      
    } 
  }
  const checkWinner=()=>{
    if(gameState[0]===gameState[1] && gameState[0]===gameState[2] && gameState[0]!=='empty'){
      setGameWinner(`${gameState[0]} won`)
    }
    else if(gameState[3]===gameState[4] && gameState[3]===gameState[5] && gameState[3]!=='empty'){
      setGameWinner(`${gameState[3]} won`)
      }
    else if(gameState[6]===gameState[7] && gameState[6]===gameState[8] && gameState[6]!=='empty'){
      setGameWinner(`${gameState[6]} won`)
      }
    else if(gameState[0]===gameState[3] && gameState[0]===gameState[6] && gameState[0]!=='empty'){
      setGameWinner(`${gameState[0]} won`)
      }
    else if(gameState[1]===gameState[4] && gameState[1]===gameState[7] && gameState[1]!=='empty'){
      setGameWinner(`${gameState[1]} won`)
      }
    else if(gameState[2]===gameState[5] && gameState[2]===gameState[8] && gameState[2]!=='empty'){
      setGameWinner(`${gameState[2]} won`)
      }
    else if(gameState[0]===gameState[4] && gameState[0]===gameState[8] && gameState[0]!=='empty'){
      setGameWinner(`${gameState[0]} won`)
      }
    else if(gameState[2]===gameState[4] && gameState[2]===gameState[6] && gameState[2]!=='empty'){
      setGameWinner(`${gameState[2]} won`)
      }
    else if(!gameState.includes('empty')){
      setGameWinner("Match Tie")
    }
    else{
      setGameWinner("")
    }

 
  };
  return (
    <SafeAreaView>
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.WinnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>

        </View>
      ):(
        <View style={[styles.playerINfo,isCross ? styles.playerX:styles.playerO]}
        >
          <Text style={styles.gameTurn} >Player {isCross? 'X':'O'}'s Turn</Text>
        </View>
      )}


      //Game Grid
      <FlatList
      numColumns={3}
      data={gameState}
      style={styles.grid}
      renderItem={({item , index})=> (
        <Pressable key={index}
        style={styles.card}
        onPress={()=> onChangeItem(index)}>
          <Icons name={item}/>

        </Pressable>
      )} />

      //game Action 
      <Pressable  style={gameBtn}
        onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ?'start new game':'reload the game '}
        </Text>
      </Pressable>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  
})