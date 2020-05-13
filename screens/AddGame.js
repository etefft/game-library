import React, {
    useState,
    useEffect,
} from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    ActivityIndicator,
    Image,
} from 'react-native';

import useDebounce from '../use-debounce';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function AddGame({
    navigation, route
}) {
    const [game, onChangeText] = React.useState('');
    const [gameData, setData] = React.useState([]);
    const [isLoading, setLoading] = useState(true);

    const debouncedSearchTerm = useDebounce(game, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetch(`https://api.rawg.io/api/games?search=${debouncedSearchTerm}`)
          .then((response) => response.json())
          .then((json) => setData(json.results))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
          console.log(gameData);
          
        }
        
      }, [debouncedSearchTerm]);
    
    
    return (
        <View>
            <Text>Search For A Game</Text>
            
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={game}
            />
            {isLoading ? <ActivityIndicator
                style={{marginTop: 50}}
            /> : (
                <FlatList
                    contentContainerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 30,}}
                    data={gameData}
                    keyExtractor={({ name }, index) => name}
                    renderItem={({ item }) => (
                        <TouchableHighlight
                            activeOpacity={0.6}
                            underlayColor="#DDDDDD"
                            onPress={() => {
                                navigation.navigate('InsertGame', {
                                    itemId: item.id,
                                    name: item.name,
                                    release: item.released,
                                    image: item.background_image, 
                                    onGameAdded: route.params.onGameAdded,                                   
                                })
                            }}

                        >
                            <View
                                style={{ marginBottom: 20, alignItems: 'center', padding: 10,}}
                            >
                                <Image 
                                    style={{width: 130
                                        , height: 100}}
                                    source={{uri: `${item.background_image}`}}
                                />
                                <Text>{item.name}</Text>
                                <Text>{item.released}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                />
            )}
        </View>
    )
}

