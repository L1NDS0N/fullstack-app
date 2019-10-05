import React, { useState, useEffect } from 'react';

import { SafeAreaView, ScrollView, StyleSheet, Text, Image, AsyncStorage } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List(){
    const [ technologies, setTechnologies] = useState([]);
    
    useEffect(() => {
        AsyncStorage.getItem('technologies').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechnologies(techsArray);
        })
    }, []);

    return (
    <SafeAreaView style={styles.container}>
        <Image source={logo} style={styles.logo}/>

        <ScrollView>
        {technologies.map(tech => {
            <SpotList key={tech} tech={tech}/>
        })}
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10 
    }
});