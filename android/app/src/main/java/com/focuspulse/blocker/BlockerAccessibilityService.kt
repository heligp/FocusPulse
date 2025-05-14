package com.focuspulse.blocker

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.AccessibilityServiceInfo
import android.view.accessibility.AccessibilityEvent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter

class BlockerAccessibilityService : AccessibilityService() {

    /** Tabla in-memory de apps actualmente bloqueadas */
    private val blockedNow = mutableSetOf<String>()

    override fun onServiceConnected() {
        super.onServiceConnected()

        // 1) Registra la instancia viva para que el módulo JS la encuentre
        BlockerServiceHolder.service = this

        // 2) Configura los eventos que te interesan
        serviceInfo = AccessibilityServiceInfo().apply {
            eventTypes = AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED
            packageNames = null           // todas las apps
            feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC
        }
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        val pkg = event.packageName?.toString() ?: return
        if (pkg in blockedNow) {
            // 1) Manda evento a JS para mostrar overlay motivacional
            sendToJs(pkg)
            // 2) Lanza pantalla propia y cierra la app destino
            performGlobalAction(GLOBAL_ACTION_BACK)
        }
    }

    override fun onInterrupt() {
    // Cuando el servicio deje de estar disponible…
    BlockerServiceHolder.service = null
    }

    /** API pública para añadir/quitar apps (lo llama el módulo JS) */
    fun setBlocked(pkgs: List<String>) {
        blockedNow.clear()
        blockedNow.addAll(pkgs)
    }

    private fun sendToJs(pkg: String) {
        (application as? ReactApplicationContext)
            ?.getJSModule(RCTDeviceEventEmitter::class.java)
            ?.emit("BLOCKED_APP", pkg)
    }
}
