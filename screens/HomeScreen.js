import * as WebBrowser from 'expo-web-browser';
import React, {useEffect, useState,} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Button, AsyncStorage, TouchableHighlight, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

export default function HomeScreen({ navigation }) {

  const [gameSaves, setGameSaves] = React.useState([]);

  const gameList = ["hello"];

  const getGames = async () => {
    try {
      const value = await AsyncStorage.getItem('gameLibrary');
      if (value != null) {

        console.log(JSON.parse(value));
        
        
        setGameSaves(JSON.parse(value));

      } 
    } catch (error) {
      // Error retrieving data
    }
  }

   useEffect(() => {
       
    getGames();    
    
  }, []);

  
 
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.main} source={require('../assets/images/main.png')}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        horizontal={true}
      >
        {gameSaves.map((gameSave) => {
          return (
            
              <TouchableHighlight
                style={{height: 300,}}
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => {
                navigation.navigate('ViewGame', {
                  itemId: gameSave.itemId,
                  name: gameSave.name,
                  release: gameSave.release,
                  image: gameSave.image,
                  review: gameSave.value, 
                  onGameAdded: getGames,                                   
                })
              }}
              >
              <View
              style={{alignItems: 'center', marginTop: 80, margin: 20, width: 300, height: 300,}}
            >
                <Image 
                  style={{width: 300, height: 200}}
                  source={{uri: `${gameSave.image}`}}
                />
                <Text key={gameSave.name}>{gameSave.name}</Text>
              </View>  
            </TouchableHighlight>
          )
        })}            
      </ScrollView>
      <View 
      style={styles.addGame}
      >
        <Button
          title="Add A Game"
          onPress={() => navigation.navigate('AddGame', {onGameAdded: getGames})}
        />

      </View>
      </ImageBackground>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    height: '90%'
  },
  main: {
    height: '100%',
  },
  addGame: {
    marginBottom: 50,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
