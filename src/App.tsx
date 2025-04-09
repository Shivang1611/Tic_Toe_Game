import { SafeAreaView, ScrollView, StyleSheet, Text, View,StatusBar, FlatList, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import Snackbar from 'react-native-snackbar'
import Icon from './components/Icons'
import { useState } from 'react'
import Sound from 'react-native-sound';



function App() :J9SX.Element {
  const [sound] = useState(
    new Sound('touch.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
      }
    })
  );

  const [tapSound] = useState(
    new Sound('touch.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the tap sound', error);
      }
    })
  );
  const playSound = () => {
    sound.play((success) => {
      if (success) {
        console.log('Sound played successfully');
      } else {
        console.log('Failed to play sound');
      }
    });
  };

  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
    if (isSoundEnabled) {
      playSound();
    }
  };
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
  const handlePress = (index: number) => {
    tapSound.stop(() => {
      tapSound.play((success) => {
        if (!success) {
          console.log('Tap sound playback failed');
        }
      });
    });
    onChangeItem(index)
  };

  // Clean up sound resources on unmount
  useEffect(() => {
    return () => {
      tapSound.release();
      sound.release();
    };
  }, [sound]);
  const checkWinner = () => {
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
  // Duplicate handlePress function removed
  return (
    <SafeAreaView style={{ flex:1, backgroundColor: '#ccdad1' }}>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.title}>Tic Tac Toe</Text>
      </View>
      <View
        style={[
          styles.playerInfo,
          isCross ? styles.playerX : styles.playerO,
        ]}
      >
        <Text style={styles.gameTurnTxt}>
          {`Player ${isCross ? 'X' : 'O'}'s Turn`}
        </Text>
      </View>


  {gameWinner ? (
    // Player Info
    <View style={[styles.playerInfo, gameWinner.includes('cross') ? styles.playerX : styles.playerO]}>
      <Text style={styles.gameTurnTxt}>{gameWinner}</Text>
    </View>
  ) : null}

  {/* Game Grid */}
  <FlatList
    numColumns={3}
    data={gameState}
    style={styles.grid}
    renderItem={({ item, index }) => (
      <Pressable
        key={index}
        style={styles.card}
        onPress={() => handlePress(index)}
      >
        <Icon name={item} size={24} color="#000" />
      </Pressable>
    )}
  />

  {/* Game Action */}
  <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start New Game' : 'Reload the Game'}
        </Text>
      </Pressable>

      {/* Sound Toggle Button */}
      <Pressable style={styles.AddingTap} onPress={toggleSound}>
        <Text style={                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           styles.gameBtnText}>
          {isSoundEnabled ? 'Disable Sound' : 'Enable Sound'}
        </Text>
      </Pressable>
    

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#70a9a1',
    width: 200,
    
    marginTop: 20,
    
    borderRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 5,
    marginHorizontal: 90,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
    
    
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    
    
    textTransform: 'uppercase',
    // textShadowColor: '#000000',
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 5,
    textDecorationLine: 'none',
    textDecorationStyle: 'dashed',
    textDecorationColor: '#000000',
    
    textAlignVertical: 'center',
   
  },
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#eb6424',
  },
  playerO: {
    backgroundColor: '#006466',
  },
  grid: {
    margin: 12,
    marginTop:45
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
    
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
    
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  AddingTap:{
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 36,
    marginTop: 15,
    backgroundColor: '#284b63',
    marginBottom: 70,
    
  }
});

export default App;