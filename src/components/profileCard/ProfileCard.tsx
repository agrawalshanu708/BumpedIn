import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { Button, Heading } from 'native-base';
import { ROUTES } from '../../routes/Routes';

const ProfileCard = (props: any) => {

    const { firstName, lastName, designation, organization, batch, course, college, editCta = false, navigation } = props

    const handleEditPress = useCallback(() => {
        navigation.navigate(ROUTES.ACCOUNT_STACK.name, { screen: ROUTES.EDIT_USER_DETAILS.name })
    }, [navigation])

    const getContentView = () => (
        <View style={styles.contentContainer}>
            <Heading style={styles.firstNameText}>{firstName}</Heading>
            <Heading style={styles.lastNameText}>{lastName}</Heading>
            <Text style={styles.batchText}>{college} ${course} CLASS OF ${batch}</Text>
            <Heading style={styles.designationText}>{designation}</Heading>
            <Heading style={styles.organisationText}>{organization}</Heading>
        </View>
    )

    const getActionView = () => (
        editCta && <Button onPress={handleEditPress} style={styles.editCta} >Edit</Button>
    )

    return (
        <View style={styles.container}>
            {getContentView()}
            {getActionView()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E0F4FF',
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    contentContainer: {},
    firstNameText: {},
    lastNameText: {},
    batchText: {
        marginTop: 20
    },
    designationText: {
        marginTop: 20,
    },
    organisationText: {
        marginTop: 6
    },
    editCta: {
        alignSelf: 'flex-end',
        marginTop: 12
    }
})

export default ProfileCard
