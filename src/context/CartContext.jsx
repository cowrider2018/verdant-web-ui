import { createContext, useContext, useEffect, useReducer, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'verdant-cart'

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { product, qty = 1 } = action
      const existing = state.find((i) => i.id === product.id)
      if (existing) {
        return state.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i,
        )
      }
      return [...state, { id: product.id, qty }]
    }
    case 'remove':
      return state.filter((i) => i.id !== action.id)
    case 'setQty':
      return state
        .map((i) =>
          i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i,
        )
        .filter((i) => i.qty > 0)
    case 'clear':
      return []
    default:
      return state
  }
}

function init() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, init)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore */
    }
  }, [items])

  const count = items.reduce((sum, i) => sum + i.qty, 0)

  const add = (product, qty = 1) => {
    dispatch({ type: 'add', product, qty })
    setToast(`已加入購物車 · ${product.name}`)
  }
  const remove = (id) => dispatch({ type: 'remove', id })
  const setQty = (id, qty) => dispatch({ type: 'setQty', id, qty })
  const clear = () => dispatch({ type: 'clear' })

  // toast 自動消失
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(t)
  }, [toast])

  return (
    <CartContext.Provider
      value={{ items, count, add, remove, setQty, clear, toast }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart 必須在 CartProvider 內使用')
  return ctx
}
