import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Heading, Button } from 'native-base'
import stringTemplate from "string-template";

import { ROUTES } from './../../routes/Routes';
import { FORM_STATICS } from './FormStatics';
import Form1 from './../../components/form/Form';
import { useAuth } from './../../hooks/useAuth';

const Form = ({ navigation }: { navigation: any }) => {

    const { userData } = useAuth()

    const handleSkipPress = useCallback(() => {
        navigation.navigate(ROUTES.PROFILE_VIEW.name)
    }, [])

    const getHeaderView = () => (
        <Heading style={styles.heading}>{stringTemplate(
            FORM_STATICS.HEADER.heading, { name: userData?.firstName || '' }
        )}</Heading>
    )

    const getFormView = () => (
        <View style={styles.formContainer}>
            <Text style={styles.formHeading}>{FORM_STATICS.FORM.heading}</Text>
            <Text style={styles.formSubHeading}>{FORM_STATICS.FORM.subHeading}</Text>
            <Form1 navigation={navigation} />
        </View>
    )

    const getActionView = () => (
        <Button onPress={handleSkipPress} style={styles.skipCta} variant="ghost">{FORM_STATICS.FOOTER.cta.name}</Button>
    )

    return (
        <View style={styles.container}>
            {getHeaderView()}
            {getFormView()}
            {getActionView()}
        </View>
    )
}

export default Form;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        flex: 1,
    },
    heading: {},
    formContainer: {
        flex: 1,
        paddingVertical: 24,
    },
    formHeading: {
    },
    formSubHeading: {
        marginBottom: 24
    },
    skipCta: {
        alignSelf: 'flex-end',
    },
})