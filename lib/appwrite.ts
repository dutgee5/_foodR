import {Account, Avatars, Client, Databases, ID, Query} from "react-native-appwrite";

export const appwrite = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    platform: "com.theDone.foodReactNative",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    dbId: "686a7b3a00245150d446",
    userCollId: "686a7b770014428b4bb0",

}


if (!appwrite.endpoint || !appwrite.projectId) throw new Error("Appwrite config not found")


export const client = new Client();

client
    .setEndpoint(appwrite.endpoint)
    .setProject(appwrite.projectId)
    .setPlatform(appwrite.platform)

export const account = new Account(client);
export const db = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async (email: string, password: string, name: string) => {

    try {

        const newAccount = await account.create(ID.unique(), email, password, name);

        if (!newAccount) throw new Error()

        await sigIn(email, password)

        const avatarUrl = avatars.getInitialsURL(name)

        return await db.createDocument(
            appwrite.dbId,
            appwrite.userCollId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email, name,
                avatar: avatarUrl
            }
        );

    } catch (e) {
        throw new Error(e as string)
    }
}

export const sigIn = async (email: string, password: string) => {

    try {
        const session = await account.createEmailPasswordSession(email, password);
    } catch (e) {
        throw new Error(e as string)
    }
}

export const getCurrentUser = async () => {

    try {
        const currentAccount = await account.get();
        if (!currentAccount) return Error

        const currentUser = await db.listDocuments(
            appwrite.dbId,
            appwrite.userCollId,
            [Query.equal('accountId', currentAccount.$id)],
        )

        if (!currentUser) return Error

        return currentUser.documents[0]

    } catch (e) {
        throw new Error(e as string)
    }
}
