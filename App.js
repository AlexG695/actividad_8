import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , FlatList, ActivityIndicator} from 'react-native';

export default function App() {


  const [datos, setData] = useState([]);
  const[isLoading, setLoading] = useState(true);

  


  const getPosts = async() => {

    try {
      const url = "https://jsonplaceholder.typicode.com/posts";
      //consumir los datos

      const response =  await fetch(url);

      //convertir a json
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally{
      setLoading(false);
    }
    
  }

  useEffect(() => {
    getPosts();
  }, []);


  return (
    <View style={styles.container}>
      {
        isLoading ? <ActivityIndicator /> : (
          <FlatList 
            data = {datos}
            keyExtractor = {({id}, index) => id}
            renderItem = {
            ({item}) => (
              <Text>
                {item.title}
              </Text>
            )
          }
        />
          
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
