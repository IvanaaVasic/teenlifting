"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiPaperAirplane, HiCheck } from "react-icons/hi";
import styles from "./ContactForm.module.css";

// Zod validation schema
const contactSchema = z.object({
    name: z
        .string()
        .min(1, "Ime je obavezno")
        .min(2, "Ime mora imati najmanje 2 karaktera"),
    email: z
        .string()
        .min(1, "Email je obavezan")
        .email("Unesite validnu email adresu"),
    phone: z.string().optional(),
    subject: z.string().min(1, "Izaberite temu"),
    message: z
        .string()
        .min(1, "Poruka je obavezna")
        .min(10, "Poruka mora imati najmanje 10 karaktera"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
    successMessage?: string;
}

export function ContactForm({ successMessage }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);

        try {
            // EmailJS template parameters
            const templateParams = {
                from_name: data.name,
                from_email: data.email,
                phone: data.phone || "Nije uneto",
                subject: data.subject,
                message: data.message,
            };

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            toast.success("Poruka je uspešno poslata! Hvala vam!");
            setIsSuccess(true);
            reset();
        } catch (error) {
            console.error("Failed to send email:", error);
            toast.error("Greška pri slanju poruke. Pokušajte ponovo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className={styles.successContainer}>
                <div className={styles.successIcon}>
                    <HiCheck size={40} />
                </div>
                <p className={styles.successText}>
                    {successMessage ||
                        "Hvala na poruci! Odgovorićemo vam u najkraćem mogućem roku."}
                </p>
                <button
                    type="button"
                    className={styles.resetButton}
                    onClick={() => setIsSuccess(false)}
                >
                    Pošaljite još jednu poruku
                </button>
                <ToastContainer position="top-right" autoClose={5000} />
            </div>
        );
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>
                            Ime i prezime{" "}
                            <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                            placeholder="Vaše ime"
                            {...register("name")}
                        />
                        {errors.name && (
                            <span className={styles.errorText}>
                                {errors.name.message}
                            </span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                            placeholder="vas@email.com"
                            {...register("email")}
                        />
                        {errors.email && (
                            <span className={styles.errorText}>
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>
                            Telefon
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            className={styles.input}
                            placeholder="+381 XX XXX XXXX"
                            {...register("phone")}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="subject" className={styles.label}>
                            Tema <span className={styles.required}>*</span>
                        </label>
                        <select
                            id="subject"
                            className={`${styles.select} ${errors.subject ? styles.inputError : ""}`}
                            {...register("subject")}
                        >
                            <option value="">Izaberite temu</option>
                            <option value="Opšte informacije">
                                Opšte informacije
                            </option>
                            <option value="Zakazivanje termina">
                                Zakazivanje termina
                            </option>
                            <option value="Tretmani lica">Tretmani lica</option>
                            <option value="Tretmani tela">Tretmani tela</option>
                            <option value="Cene i promocije">
                                Cene i promocije
                            </option>
                            <option value="Drugo">Drugo</option>
                        </select>
                        {errors.subject && (
                            <span className={styles.errorText}>
                                {errors.subject.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>
                        Poruka <span className={styles.required}>*</span>
                    </label>
                    <textarea
                        id="message"
                        className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                        rows={6}
                        placeholder="Opišite vašu poruku ili pitanje..."
                        {...register("message")}
                    />
                    {errors.message && (
                        <span className={styles.errorText}>
                            {errors.message.message}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className={styles.spinner} />
                            Slanje...
                        </>
                    ) : (
                        <>
                            <HiPaperAirplane size={20} />
                            Pošaljite poruku
                        </>
                    )}
                </button>
            </form>
            <ToastContainer position="top-right" autoClose={5000} />
        </>
    );
}
