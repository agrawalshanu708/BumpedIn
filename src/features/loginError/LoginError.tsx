import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

import { LOGIN_ERROR_STATICS } from './LoginErrorStatics';
import { ROUTES } from './../../routes/Routes';
import { SIZE } from './../../enums';

const LoginError = ({ navigation }: { navigation: any }) => {

    const HandlePress = useCallback(() => {
        navigation.navigate(ROUTES.FORM.name)
    }, [navigation])

    return (
        <View style={styles.container}>
            <Text fontSize={SIZE.MD} color={'gray.900'} style={styles.text}>{LOGIN_ERROR_STATICS.ERROR_TEXT_1}<Text bold>{LOGIN_ERROR_STATICS.ERROR_TEXT_2}</Text><Text>{LOGIN_ERROR_STATICS.ERROR_TEXT_3}</Text></Text>
            <Button size={SIZE.MD} onPress={HandlePress} style={styles.tryAgainCta}><Text fontWeight={600} fontSize={15} color={'white'}>{LOGIN_ERROR_STATICS.CTA.name}</Text></Button>
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
        marginTop: 12
    },
});

export default LoginError;
