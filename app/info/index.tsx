import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Icon } from '@rneui/themed';
import { WebView } from 'react-native-webview';

export default function Info() {
  const data = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', alignItems: "flex-start", padding: 15 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ height: 40, width: 40, borderRadius: 40, borderColor: "black", borderWidth: 2 }}>
          <Icon
            name='arrow-left' size={35} type="material-community" />
        </TouchableOpacity>

      </View>
      <View>
        <Text style={{ fontSize: 30, fontWeight: "800" }}>{data.en}</Text>
        <WebView
          scalesPageToFit={true}
          bounces={false}
          javaScriptEnabled
          style={{ height: 500, width: 300 }}
          source={{
            html: `
                  <!DOCTYPE html>
                  <html>
                    <head></head>
                    <body>
                      <div id="baseDiv">
                        <iframe src='https:${data.url}/embed?simple=1' scrolling='no' frameborder='0'></iframe>
                      </div> 
                    </body>
                  </html>
            `,
          }}
          automaticallyAdjustContentInsets={false}
        />

      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}) 