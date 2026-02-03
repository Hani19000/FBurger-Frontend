import { vi } from 'vitest'
import '@testing-library/jest-dom'


vi.mock('react-hot-toast', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
        loading: vi.fn(),
    },
    default: {
        success: vi.fn(),
        error: vi.fn(),
    }
}))
