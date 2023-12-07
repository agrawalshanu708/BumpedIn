import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NEW_MATCH_STATICS } from './NewMatchStatics';
import { Button, Heading } from 'native-base';
import { ROUTES } from '../../routes/Routes';

const NewMatch = ({ navigation }: { navigation: any }) => {

    const handleChatPress = useCallback(() => {
        navigation.navigate(ROUTES.MESSAGE_STACK.name, { screen: ROUTES.CHAT_SCREEN.name })
    }, [navigation])

    const handleLaterPress = useCallback(() => {
        navigation.navigate(ROUTES.CONNECT_STACK.name, { screen: ROUTES.SWIPE_USER.name })
    }, [navigation])

    const getContentView = () => (
        <View style={styles.contentContainer}>
            <Heading style={styles.heading}>{NEW_MATCH_STATICS.HEADING}</Heading>
            <Heading style={styles.subHeading}>
                {NEW_MATCH_STATICS.SUBHEADING}
            </Heading>
            <Button onPress={handleChatPress} style={styles.sendMessageCta}>
                {NEW_MATCH_STATICS.cta.name}
            </Button>
            <Text style={styles.expiredText}>{NEW_MATCH_STATICS.EXPIRED_TEXT}</Text>
        </View>
    );

    const getFooterView = () => (
        <View style={styles.footerContainer}>
            <Button onPress={handleLaterPress} style={styles.laterCta} variant="ghost">
                {NEW_MATCH_STATICS.FOOTER.cta.name}
            </Button>
        </View>
    );

    return (
        <View style={styles.container}>
            {getContentView()}
            {getFooterView()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerContainer: {},
    heading: {
        textAlign: 'center',
    },
    subHeading: {
        textAlign: 'center',
    },
    sendMessageCta: {
        marginTop: 24,
    },
    expiredText: {
        marginTop: 6,
        textAlign: 'center',
    },
    laterCta: {
        alignSelf: 'flex-end',
    },
});

export default NewMatch;
