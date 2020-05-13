import React, {
    useState,
    useEffect,
} from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Image,
    AsyncStorage,
} from 'react-native';

export default function InsertGame({
        route, navigation
    }) {
        /* 2. Get the param */
        const { itemId } = route.params;
        const { name, release, image, review, onGameAdded} = route.params;
        const [value, onChangeText] = React.useState('Useless Placeholder');

        
        

        async function SetGameData (deleteGame) {
            let game_object = {
                name: name,
                image: image,
                value: value,
                release: release,
                itemId: itemId
            }
           console.log(game_object);
           
            
            let result = await AsyncStorage.getItem('gameLibrary');
            console.log(result);
            let newGame = await JSON.parse(result);
            console.log(newGame);
        
            let removeIndex = newGame.map((item) => item.itemId).indexOf(itemId);
            console.log(removeIndex);
                    
            newGame.splice(removeIndex, 1);
            await AsyncStorage.setItem('gameLibrary', JSON.stringify(newGame));                 
            onGameAdded();
                
          };
        
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, alignItems: 'center', marginTop: 30, marginBottom: 100,}}>
                    <Image 
                        style={{width: 300, height: 200}}
                        source={{uri: `${image}`}}
                    />
                    <Text>{name}</Text>
                    <Text>{release}</Text>                       
                    <Text
                        style={{marginTop: 10,}}
                    >Personal Review:</Text>
                    <Text
                        style={{margin: 10, fontSize: 18, textAlign: 'center', }}
                        value={value}
                    >{review}</Text>
                    <Button title="Delete Game" onPress={() => { 
                            SetGameData(true);
                            navigation.navigate('Root');
                        }} 
                    />
              </View>
              
              <View
                style={{marginBottom: 20}}
              >
                <Button title="Go to Home" onPress={() => navigation.navigate('Root')} />
              </View>            
          </View>
        );
      }