import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false); 

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    //Liga flash do celular
    Torch.switchState(toggle);    
  }, [toggle]);

  useEffect(() => {
    /**
     * Quando o celular for chacoalhado, mudaremos o toggle
     */
    const subscription = RNShake.addListener(() =>{
      setToggle(oldToggle => !oldToggle)
    });

    //Essa função vai ser chamanda quando o components
    //For ser desmontando 
    return () => subscription.remove();    
  },[])

  return ( 
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image 
          style={toggle ? style.lightingOn : style.lightingOff} 
          source={
            toggle 
            ? require('./assets/icones/eco-light.png') 
            : require('./assets/icones/eco-light-off.png')
          }
        />
        <Image 
          style={style.dioLogo}
          source={
            toggle 
            ? require('./assets/icones/logo-dio.png') 
            : require('./assets/icones/logo-dio-white.png')
          }
        />  
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    heigth: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    heigth: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    heigth: 250,
  },     
});