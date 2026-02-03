import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/ConfirmModal.css'; // On va créer ce CSS juste après

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="modal-overlay">
                <motion.div
                    className="modal-content"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <div className="modal-header">
                        <span className="modal-icon">!</span>
                        <h3 className="modal-title">{title}</h3>
                    </div>

                    <p className="modal-message">{message}</p>

                    <div className="modal-actions">
                        <button className="btn-modal-cancel" onClick={onClose}>
                            Annuler
                        </button>
                        <button className="btn-modal-confirm" onClick={onConfirm}>
                            Confirmer la suppression
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ConfirmModal;