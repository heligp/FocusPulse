package com.focuspulse.blocker

import com.facebook.react.bridge.*

class BlockerModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "Blocker"

    @ReactMethod
    fun updateBlocked(apps: ReadableArray) {
        // recupera la instancia y llama al método
        BlockerServiceHolder.service
            ?.setBlocked(apps.toArrayList().map { it as String })
    }

    @ReactMethod
    fun addListener(eventName: String) {
        // ¡Requerido por NativeEventEmitter! No hagas nada aquí.
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // ¡Requerido por NativeEventEmitter! No hagas nada aquí.
    }
}
