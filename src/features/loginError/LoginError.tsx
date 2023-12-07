import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

import { LOGIN_ERROR_STATICS } from './LoginErrorStatics';
import { ROUTES } from './../../routes/Routes';

const LoginError = ({ navigation }: { navigation: any }) => {

    const HandlePress = useCallback(() => {
        navigation.navigate(ROUTES.FORM.name)
    }, [navigation])

    return (
        <View style={styles.container}>
            <Text fontSize={SIZE.XS} style={styles.text}>{LOGIN_ERROR_STATICS.ERROR_TEXT}</Text>
            <Button onPress={HandlePress} style={styles.tryAgainCta}>{LOGIN_ERROR_STATICS.CTA.name}</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 36,
        paddingVertical: 36,
    },

    text: {
        textAlign: 'center',
    },

    tryAgainCta: {
        marginTop: 6
    },
});

export default LoginError;
