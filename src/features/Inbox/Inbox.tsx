import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MessangerProfileCard from './../../components/messangerProfileCard/MessangerProfileCard';

const Inbox = () => {
    return (
        <View style={styles.container}>
            <MessangerProfileCard />
            <MessangerProfileCard />
            <MessangerProfileCard />
        </View>
    )
}

export default Inbox

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 12,
    }
})