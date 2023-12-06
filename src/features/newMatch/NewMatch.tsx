import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { NEW_MATCH_STATICS } from './NewMatchStatics'
import { Button, Heading } from 'native-base'

const NewMatch = () => {

    const getContentView = () => (
        <View style={styles.contentContainer}>
            <Heading style={styles.heading}>{NEW_MATCH_STATICS.HEADING}</Heading>
            <Heading style={styles.subHeading}>{NEW_MATCH_STATICS.SUBHEADING}</Heading>
            <Button style={styles.sendMessageCta}>{NEW_MATCH_STATICS.cta.name}</Button>
            <Text style={styles.expiredText}>{NEW_MATCH_STATICS.EXPIRED_TEXT}</Text>
        </View>
    )

    const getFooterView = () => (
        <View style={styles.footerContainer}>
            <Button style={styles.laterCta} variant="ghost">{NEW_MATCH_STATICS.FOOTER.cta.name}</Button>
        </View>
    )

    return (
        <View style={styles.container}>
            {getContentView()}
            {getFooterView()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 36,
        paddingVertical: 36,
        flex: 1
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
        alignSelf: 'flex-end'
    },
})

export default NewMatch
