import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FormControl, Input, VStack, Button } from 'native-base';

function BuildingAFormExample() {
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
        validate() ? console.log('Submitted') : console.log('Validation Failed');
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

const EditForm = () => {
    return (
        <View style={styles.container}>
            <BuildingAFormExample />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 36,
        paddingVertical: 36,
    }
})

export default EditForm
