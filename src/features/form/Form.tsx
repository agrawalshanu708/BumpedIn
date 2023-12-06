import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FormControl, Text, Heading, Input, VStack, Button } from 'native-base'

import { ROUTES } from './../../routes/Routes';
import { FORM_STATICS } from './FormStatics';

function BuildingAFormExample({ navigation }: { navigation: any }) {
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const validate = () => {
        if (formData.name === undefined) {
            setErrors({
                ...errors,
                name: 'Name is required'
            });
            return false;
        } else if (formData.name.length < 3) {
            setErrors({
                ...errors,
                name: 'Name is too short'
            });
            return false;
        }

        return true;
    };

    const onSubmit = () => {
        // validate() ? console.log('Submitted') : console.log('Validation Failed');
        navigation.navigate(ROUTES.PROFILE_VIEW.name)
    };

    return <VStack>
        <FormControl isInvalid={'name' in errors}>
            <FormControl.Label _text={{
                bold: true
            }}>Designation</FormControl.Label>
            <Input placeholder="John" onChangeText={value => setData({
                ...formData,
                designation: value
            })} />
            {/* {'name' in errors ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> : <FormControl.HelperText>
                Name should contain atleast 3 character.
            </FormControl.HelperText>} */}
            <FormControl.Label _text={{
                bold: true
            }}>Organisation</FormControl.Label>
            <Input placeholder="John" onChangeText={value => setData({
                ...formData,
                organisation: value
            })} />
            {/* {'name' in errors ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> : <FormControl.HelperText>
                Name should contain atleast 3 character.
            </FormControl.HelperText>} */}
        </FormControl>
        <Button onPress={onSubmit} mt="5" colorScheme="cyan">
            Save
        </Button>
    </VStack>;
}

const Form = ({ navigation }: { navigation: any }) => {

    const getHeaderView = () => (
        <View style={styles.headerContainer}>
            <Heading style={styles.heading}>{FORM_STATICS.HEADER.heading}</Heading>
            <Text style={styles.subHeading}>{FORM_STATICS.HEADER.subHeading}</Text>
        </View>
    )

    const getFormView = () => (
        <View style={styles.formContainer}>
            <Text style={styles.formHeading}>{FORM_STATICS.FORM.heading}</Text>
            <View style={styles.formWrapper}>
                <BuildingAFormExample navigation={navigation} />
            </View>
        </View>
    )
    const getContentView = () => (
        <View style={styles.contentContainer}>
            {getHeaderView()}
            {getFormView()}
        </View>
    )

    const getFooterView = () => (
        <Button style={styles.skipCta} variant="ghost">{FORM_STATICS.FOOTER.cta.name}</Button>
    )

    return (
        <View style={styles.container}>
            {getContentView()}
            {getFooterView()}
        </View>
    )
}

export default Form

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 36,
        paddingVertical: 36,
        flex: 1
    },
    contentContainer: {
        flex: 1,
    },
    headerContainer: {},
    heading: {},
    subHeading: {
        marginTop: 36
    },
    formContainer: {
        marginTop: 6
    },
    formHeading: {
    },
    formWrapper: {
        marginTop: 48
    },
    skipCta: {
        alignSelf: 'flex-end'
    }
})