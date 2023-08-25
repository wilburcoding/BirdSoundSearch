import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Icon } from '@rneui/themed';
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';

export default function Info() {
  const data: any = useLocalSearchParams();
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState<any>(null);
  var audioUrl = "https:" + data.sono.split("ffts/")[0] + data["file-name"]
  function titleCase(str: string) {
    if (str == "") {
      return "Unknown"
    }
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  }
  function convertTime(time: string) {
    if (time.split(":")[0] == "0") {
      return time.split(":")[1] + "s";
    } else {
      return time.split(":")[0] + "m " + Number(time.split(":")[1]).toString() + "s";
    }
  }
  function convertHour(time: string) {
    if (Number(time.split(":")[0]) < 12) {
      return Number(time.split(":")[0]) + ":" + time.split(":")[1] + "AM"
    }
    return Number(time.split(":")[0]) + ":" + time.split(":")[1] + "PM"

  }
  function getSeen() {
    return data["animal-seen"] == "Yes" || data["bird-seen"] == "Yes" ? "Seen" : "Not Seen";
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', alignItems: "flex-start", padding: 15 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ height: 40, width: 40, borderRadius: 40, borderColor: "black", borderWidth: 2 }}>
          <Icon
            name='arrow-left' size={35} type="material-community" />
        </TouchableOpacity>

      </View>
      <ScrollView style={{ width: "95%", padding:1}}>
        <Text style={{ fontSize: 40, fontWeight: "800", marginLeft: 15, marginTop: 10, alignSelf: "flex-start", textAlign: "left" }}>{data.en}</Text>
        <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 16, alignSelf: "flex-start", textAlign: "left", fontStyle: "italic" }}>{data.gen + " " + data.sp}</Text>
        <View style={styles.audioOptions}>
          {/* <TouchableOpacity onPress={startPlaying} style={styles.audioAction}>
            {playing ? (
              <Icon
                name='pause' size={35} type="material-community" />
            ) : (
              <Icon
                name='play' size={35} type="material-community" />
            )}

          </TouchableOpacity> */}
          <WebView source={{
            html: `
          <div>
          <audio controls style="width:100%">
  <source src="${audioUrl}">
Your browser does not support the audio element.
</audio>
          </div>
          
          `
          }}
            originWhitelist={['*']}
            javaScriptEnabled={true}
          />




        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <Image height={50} style={{ resizeMode: "cover", marginBottom: 10 }} source={{
            uri: "https:" + data.osci
          }} />
        </View>
        {data.lng.length < 2 ? (
          <Text>No location provided</Text>
        ) : (
          <View style={{paddingHorizontal:15}}>
              <Image height={230} style={{ resizeMode: "cover", marginBottom: 10 }} source={{
                uri: `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/pin-s+5AAFDD(${data.lng},${data.lat})/${data.lng},${data.lat},12/470x300?access_token=${process.env.EXPO_PUBLIC_MAPBOX_API_KEY}`
              }} />
          </View>
          
        )}



        <View style={{ flexDirection: "row" }}>
          <View style={[styles.infoView, { flex: 4, marginRight: 10 }]}>
            <Icon
              name='calendar' size={28} style={{ marginTop: 5, marginRight: 2 }} type="material-community" />
            <View>
              <Text style={{ color: "#C6C6C6", fontSize: 15 }}>DATE TAKEN</Text>
              <Text style={{ fontSize: 20 }}>{data.date}</Text>
            </View>

          </View>
          <View style={[styles.infoView, { flex: 5 }]}>
            <Icon
              name='map-marker-radius' size={28} style={{ marginTop: 5, marginRight: 2 }} type="material-community" />
            <View>
              <Text style={{ color: "#C6C6C6", fontSize: 15, paddingLeft: 3 }}>LOCATION TAKEN</Text>
              <Text numberOfLines={2} style={styles.infoText}>{titleCase(data.cnt)}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.infoView, { flex: 4, marginRight: 10 }]}>
            <Icon
              name='information-outline' size={28} style={{ marginTop: 5, marginRight: 2 }} type="material-community" />
            <View>
              <Text style={{ color: "#C6C6C6", fontSize: 15, paddingLeft: 3 }}>BIRD GENDER</Text>
              <Text style={styles.infoText}>{titleCase(data.sex)}</Text>
            </View>

          </View>
          <View style={[styles.infoView, { flex: 5 }]}>
            <Icon
              name='information-outline' size={28} style={{ marginTop: 5, marginRight: 2 }} type="material-community" />
            <View>
              <Text style={{ color: "#C6C6C6", fontSize: 15, paddingLeft: 3 }}>BIRD STAGE</Text>
              <Text style={styles.infoText}>{titleCase(data.stage)}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.infoView, { flex: 4, marginRight: 10 }]}>
            <Icon
              name='timer-outline' size={28} style={{ marginTop: 5, marginRight: 2 }} type="material-community" />
            <View>
              <Text style={{ color: "#C6C6C6", fontSize: 15, paddingLeft: 3 }}>LENGTH</Text>
              <Text style={styles.infoText}>{convertTime(data.length)}</Text>
            </View>

          </View>
          <View style={[styles.infoView, { flex: 5 }]}>
            <Icon
              name='clock-outline' size={28} style={{ marginTop: 5, marginRight: 2 }} type="material-community" />
            <View>
              <Text style={{ color: "#C6C6C6", fontSize: 15, paddingLeft: 3 }}>TIME TAKEN</Text>
              <Text style={styles.infoText}>{convertHour(data.time)}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.infoView, { flex: 4, marginRight: 10 }]}>
            <Icon
              name='microphone-outline' size={28} style={{ marginTop: 5, marginRight: 2 }} type="material-community" />
            <View>
              <Text style={{ color: "#C6C6C6", fontSize: 15, paddingLeft: 3 }}>METHOD</Text>
              <Text style={styles.infoText}>{titleCase(data.method)}</Text>
            </View>

          </View>
          <View style={[styles.infoView, { flex: 5 }]}>
            <Icon
              name='music' size={28} style={{ marginTop: 5, marginRight: 2 }} type="material-community" />
            <View>
              <Text style={{ color: "#C6C6C6", fontSize: 15, paddingLeft: 3 }}>TIME TAKEN</Text>
              <Text style={styles.infoText}>{titleCase(data.type)}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.infoView, { flex: 4, marginRight: 10 }]}>
            <Icon
              name='account-outline' size={28} style={{ marginTop: 5, marginRight: 2 }} type="material-community" />
            <View>
              <Text style={{ color: "#C6C6C6", fontSize: 15, paddingLeft: 3 }}>AUTHOR</Text>
              <Text style={[styles.infoText, { width: "90%" }]}>{titleCase(data.rec)}</Text>
            </View>

          </View>
          <View style={[styles.infoView, { flex: 5 }]}>
            <Icon
              name='binoculars' size={28} style={{ marginTop: 5, marginRight: 2 }} type="material-community" />
            <View>
              <Text style={{ color: "#C6C6C6", fontSize: 15, paddingLeft: 3 }}>ANIMAL SEEN</Text>
              <Text style={styles.infoText}>{getSeen()}</Text>
            </View>
          </View>
        </View>




      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioOptions: {
    padding: 5,
    flexDirection: 'row',
    width: '90%',
    height: 50,
    alignSelf: "center"

  },
  audioAction: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black"
  },
  infoView: {
    flex: 4,
    padding: 5,
    alignItems: "flex-start",
    flexDirection: 'row',
    margin: 5,
    borderRadius: 10,

  },
  infoText: {
    fontSize: 20,
    marginLeft: 3,
    paddingRight: 5,
    flexWrap: "wrap",
  }
}) 