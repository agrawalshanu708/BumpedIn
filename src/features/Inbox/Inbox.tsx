import { StyleSheet, View } from 'react-native';
import React from 'react';

import MessangerProfileCard from './../../components/messangerProfileCard/MessangerProfileCard';

const Inbox = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>
            <MessangerProfileCard navigation={navigation} />
            <MessangerProfileCard navigation={navigation} />
            <MessangerProfileCard navigation={navigation} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 12,
    }
})

export default Inbox;
