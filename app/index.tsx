import { StyleSheet, Text, View, SafeAreaView, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import data from './facts.json';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';
import { router } from 'expo-router';

export default function App() {
  const [result, setResult] = useState([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [val, setVal] = useState(false);
  const animalSoundFacts = data.data
  function titleCase(str: string) {
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  }
  function convertTime(time: string) {
    if (time.split(":")[0] == "0") {
      return time.split(":")[1] + "s";
    } else {
      return time.split(":")[0] + "m " + Number(time.split(":")[1]).toString() + "s";
    }
  }
  
  async function search(value: any) {
    try {
      setIsLoading(true);
      setError(null);
      setVal(value);
      const res = await axios.get('https://xeno-canto.org/api/2/recordings', { params: { query: value } });
      const data = res.data.recordings.splice(0, 100);
      console.log(data)
      setResult(data);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }

  }
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder='Search..'
        placeholderTextColor={"#C3C3C3"}
        onSubmitEditing={(v) => search(v.nativeEvent.text)}
      />
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" style={{ marginTop: 100, marginBottom: 20 }} />
          <Text style={{ fontWeight: "800", fontSize: 30, textAlign: "center", width: 300 }}>Did you know....</Text>
          <Text style={{ width: 300, textAlign: "center", fontSize: 20 }}>{animalSoundFacts[Math.floor(Math.random() * animalSoundFacts.length)]}</Text>
        </View>


      ) : error ? (
        <View style={styles.results}>
          <Text style={{ margin: 1 }}>An error occured</Text>
        </View>

      ) : result == null ? (
        <Text style={{ margin: 10, color: "#ADADAD" }}>Try searching for an animal</Text>

      ) : (
        <ScrollView style={styles.results}>
          <View>
            {(
              result.map(function (item: any, index) {
                item.sono = item.sono.small
                item.osci = item.osci.large
                return (
                  <TouchableOpacity onPress={() => router.push({pathname:"/info", params:item})} key={index} style={styles.soundItem}>
                    <View style={{flexDirection:"row", overflow:"hidden", flexWrap:"wrap"}}>
                      <Text style={{alignSelf:"flex-start", fontWeight:"500", fontSize:23, paddingRight:5, maxWidth:400}}>{item.en}</Text>
                      <View style={styles.date}>
                        <Icon
                          name='calendar-month' size={16} type="material-community"/>
                        <Text>{item.date}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={[styles.infoView, { flex: 4 }]}>
                        <Icon
                          name='map-marker-radius' size={23} type="material-community" />
                        <Text style={styles.infoText}>{item.cnt}</Text>
                      </View>
                      <View style={[styles.infoView, { flex: 5 }]}>
                        <Icon
                          name='information' size={23} type="material-community" />
                        <Text style={styles.infoText}>{titleCase(item.method)}</Text>

                      </View>
                    </View>
                    <View style={{ flexDirection: "row"}}>
                      <View style={[styles.infoView, { flex: 4 }]}>
                        <Icon
                          name='microphone' size={23} type="material-community" />
                        <Text style={styles.infoText}>{convertTime(item.length)}</Text>
                      </View>
                      <View style={[styles.infoView, { flex: 5 }]}>
                        <Icon
                          name='account-box' size={23} type="material-community" />
                        <Text numberOfLines={1}style={styles.infoText}>{titleCase(item.rec)}</Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                                      
                )
              })
            )}
          </View>

        </ScrollView>

      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    width: '90%',
    marginTop: 20,
    padding: 10,
    fontSize: 33,
    alignSelf: "center",
    borderColor: "#878787",
    borderWidth: 2,
    borderRadius: 10,
  },
  results: {
    margin: 10,
    width: "95%",
    paddingHorizontal: 10

  },
  soundItem: {
    maxHeight: 150,
    paddingHorizontal: 10,
    paddingTop:5,
    paddingBottom:15,
    marginRight: 10,
    width: "100%",
    borderColor: "#e2e2e2",
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 10,
    flex: 1
  },
  date: {
    height: 25,
    padding: 5,
    borderRadius: 10,
    margin: 5,
    backgroundColor: "#dfdede",
    alignSelf: "flex-end",
    flexDirection: "row"
  },
  infoView: {
    flex: 4,
    padding:1,
    alignItems: "flex-start",
    flexDirection: 'row',
    margin:2
  },
  infoText: {
    fontSize: 17,
    paddingLeft:2,
    paddingRight:9,
  }
});
