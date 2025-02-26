# Painfully Slow

## Description

The new security update made this app so painfully slow I had to sell my degree for a Pixel 9 to get it running. But there's another problem now: I can't restore my old backup...

## Category

rev / mobile

## Difficulty

easy / medium

## Attachments

- [v1.0.0.apk](./attachments/v1.0.0.apk)
- [secure-notes-backup.bkp](./attachments/secure-notes-backup.bkp) 

## Solution

The provided backup file doesn't make any sense, so it's probably encrypted. Trying to import the backup in the app results in a failure, even though backup-restore functionality of one's own notes seems to be working in the application. Searching for stuff like cipher.doFinal in the jadx decompiled apk quickly leads to only a couple of non-trivial instances of its use. They're apparently related to encryption/decryption of the provided backup file. The SecretKeySpec instance used takes a byte array as the key, and the value of the key (as well as the encryption scheme) can be inferred in one of many possible ways: directly reversing a bunch of preceding lines, or better yet, by inserting logging calls in the smali'd bytecode or by simply using frida hooks. The key is derived using last 6 bytes of a device-specific id (that's why the notes backup cannot be decrypted in the app), added and multiplied with a constant to make it 16-bytes long. Those 6 bytes can easily be bruteforced to give the key. Note that the decrypted output will need to be sorted by color (after all, it's an app feature) to give the flag.

```kotlin
import java.io.File
import javax.crypto.spec.*
import javax.crypto.*
fun aesDecrypt(encryptedData: ByteArray, secretKey: ByteArray): ByteArray {
    val cipher = Cipher.getInstance("AES/CBC/PKCS5Padding")
    val ivParameterSpec = IvParameterSpec(encryptedData.sliceArray(0 until 16))
    cipher.init(Cipher.DECRYPT_MODE, SecretKeySpec(secretKey, 0, 16, "AES"), ivParameterSpec)
    return cipher.doFinal(encryptedData.sliceArray(16 until encryptedData.size))
}
fun main() {
    val encr = File("secure-notes-backup.bkp").inputStream().readBytes()
    for (i in 0xFFFFFF downTo 0) {
        if (i % 0xfffff == 0) {
            println("progress: ${i / 0xfffff}/16")
        }
        val truncatedDeviceId = String.format("%06X", i).lowercase()
        val id = truncatedDeviceId.toInt(radix = 16)
        val shift = 6969696969696969696L
        val scale = 6969696969696969696L
        val extendedKey = id.toBigInteger().add(shift.toBigInteger()).multiply(scale.toBigInteger()).toByteArray()
        try {
            val restr = aesDecrypt(encr, extendedKey.sliceArray(extendedKey.size - 16 until extendedKey.size)).decodeToString()
            if (restr.contains("timestamp")) {
                println("Found $i, $restr")
            }
        } catch (ignored: Exception) {}
    }
}
```

# Flag

`KashiCTF{r1P_Ch34P_o8FuSC471oN_7_7_Nu123_117_8Hu_87W}`

