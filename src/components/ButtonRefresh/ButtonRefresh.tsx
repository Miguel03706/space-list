import React from 'react'
import "./styles.css"

export default function ButtonRefresh({ handleRefresh, loading }: { handleRefresh: () => void, loading: boolean }) {
    return (
        <button className='btn-refresh' onClick={(e) => handleRefresh()} disabled={loading}>
            {loading ? "Aguarde..." : "Atualizar"}
        </button>
    )
}
