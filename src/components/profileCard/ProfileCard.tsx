import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileCard = () => {

    const getNameView = () => (
        <View>
            <Text>Shanu</Text>
            <Text>Agrawal</Text>
        </View>
    )

    const getBatchContentView = () => (
        <Text>ISB PGP CLASS OF 2009</Text>
    )

    const getDesignationView = () => (
        <View>
            <Text>Chief Expendable officer</Text>
            <Text>Bankrupt Unicorn, Inc.</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            {getNameView()}
            {getBatchContentView()}
            {getDesignationView()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},

})

export default ProfileCard
