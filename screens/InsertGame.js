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
        const { itemId, name, release, image, onGameAdded} = route.params;
        const [value, onChangeText] = React.useState('');

        async function SetGameData () {
            let game_object = {
                itemId: itemId, 
                name: name,
                image: image,
                value: value,
                release: release
            }
            console.log(game_object);
            

            
            let result = await AsyncStorage.getItem('gameLibrary');

            if (result !== null) {
                let newGame = JSON.parse(result).concat(game_object);
                
                await AsyncStorage.setItem('gameLibrary', JSON.stringify(newGame));
            } else {
                await AsyncStorage.setItem('gameLibrary', JSON.stringify([game_object]));
            }
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
                    <TextInput
                        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                    />
                    <Button title="Add Game" onPress={() => { 
                            SetGameData();
                            navigation.navigate('Root');
                        }} 
                    />
              </View>
              
              <View
                style={{marginBottom: 20}}
              >
                <Button title="Go to Home" onPress={() => navigation.navigate('Root')} />
                <Button title="Go back" onPress={() => navigation.goBack()} />
              </View>            
          </View>
        );
      }