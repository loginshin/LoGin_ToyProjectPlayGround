import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#171717',
      alignItems: 'center',
      // justifyContent: 'center',
      padding:32
    },

    // ============================== all

    image: {
        width: 300,
        height: 300,
        borderRadius:20,
        marginBottom:26

    },
    results: {
      flex:1,
      padding:10,
      alignItems:'center',
      justifyContent: 'center',
    },
    resultsText:{
      color:"#fff",
      fontSize:30,
    },

    navigationButtonContainer:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      width:120,
      gap:30,
      marginTop:40
    },
    // ==================================Language Page

    exObjectView:{
      padding:20,
      flex:1,
    },

    exObjectText:{
      color:"#fff",
      fontSize:24,
      flex:1,
    }



    // ================================= Pattern Page



  });