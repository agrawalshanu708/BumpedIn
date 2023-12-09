import { StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import { Button, Text, Heading, Card } from 'native-base';
import { ROUTES } from '../../routes/Routes';
import { SIZE } from './../../enums';

const ProfileCard = (props: any) => {

    const { firstName, lastName, designation, organization, batch, course, college, editCta = false, navigation } = props

    const handleEditPress = useCallback(() => {
        navigation.navigate(ROUTES.ACCOUNT_STACK.name, { screen: ROUTES.EDIT_USER_DETAILS.name })
    }, [navigation])

    const getContentView = () => (
        <View style={styles.contentContainer}>
            <Heading size={SIZE['2XL']} style={styles.firstNameText}>{firstName}</Heading>
            <Heading size={SIZE['2XL']} style={styles.lastNameText}>{lastName}</Heading>
            <Text fontWeight={600} fontSize={SIZE.XL} style={styles.batchText}>{college} {course} CLASS OF {batch}</Text>
            <Text fontWeight={600} fontSize={SIZE.LG} style={styles.designationText}>{designation},</Text>
            <Text fontWeight={600} fontSize={SIZE.LG} style={styles.organisationText}>{organization}.</Text>
        </View>
    )

    const getActionView = () => (
        editCta && <View style={styles.actionContainer}>
            <Button onPress={handleEditPress} style={styles.editCta} >Edit</Button>
        </View>
    )

    return (
        <Card backgroundColor={'primary.100'} style={styles.container}>
            {getContentView()}
            {getActionView()}
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 30,
    },
    contentContainer: {
    },
    firstNameText: {
        fontWeight: '600',
    },
    lastNameText: {
        fontWeight: '600',
    },
    batchText: {
        marginTop: 20,
    },
    designationText: {
        marginTop: 20,
    },
    organisationText: {
        marginTop: 6,
    },
    actionContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    editCta: {
        alignSelf: 'flex-end',
    }
})

export default ProfileCard
