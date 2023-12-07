import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Heading } from 'native-base';

const ProfileCard = (props: any) => {

    const { firstName, lastName, designation, organization, batch, course, college } = props

    const getNameView = () => (
        <View>
            <Heading style={styles.firstNameText}>{firstName}</Heading>
            <Heading style={styles.lastNameText}>{lastName}</Heading>
        </View>
    )

    const getBatchContentView = () => (
        <Text style={styles.batchText}>`${college} ${course} CLASS OF ${batch}`</Text>
    )

    const getDesignationView = () => (
        <View style={styles.designationContainer}>
            <Heading>{designation}</Heading>
            <Heading>{organization}</Heading>
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
    container: {
        backgroundColor: '#E0F4FF',
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 100,
    },
    firstNameText: {
        // marginTop: 96
    },
    lastNameText: {},
    batchText: {
        marginTop: 20
    },
    designationContainer: {
        marginTop: 20,
        marginBottom: 96
    },

})

export default ProfileCard
