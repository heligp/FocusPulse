package com.focuspulse.blocker

/**
 * Holder para exponer la instancia activa de BlockerAccessibilityService
 * al módulo JS (BlockerModule).
 */
object BlockerServiceHolder {
    var service: BlockerAccessibilityService? = null
}