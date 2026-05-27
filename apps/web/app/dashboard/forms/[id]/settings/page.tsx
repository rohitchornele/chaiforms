"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { AlertCircle, Loader2, Save, Shield, Globe, Calendar, BarChart3 } from "lucide-react";

import { useGetForm, useUpdateForm, useUpdateFormPassword } from "~/hooks/api/form";
import UpdatePasswordModal from "~/components/forms/UpdatePasswordModal";

export default function FormSettingsPage() {
    const params = useParams();

    const formId = params.id as string;

    const { form, isLoading, error } = useGetForm(formId);

    const { updateFormAsync, isPending, isSuccess, error: updateError } = useUpdateForm();

    const {
        updateFormPasswordAsync,
        isPending: isUpdatingPassword,
        isSuccess: isPasswordUpdated,
        error: passwordUpdateError,
    } = useUpdateFormPassword();

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [visibility, setVisibility] = useState<"PUBLIC" | "UNLISTED" | "PRIVATE">("UNLISTED");

    const [isPasswordProtected, setIsPasswordProtected] = useState(false);

    const [password, setPassword] = useState("");

    const [status, setStatus] = useState<"DRAFT" | "PUBLISHED" | "ARCHIVE">("DRAFT");

    const [responseLimit, setResponseLimit] = useState("");

    const [publishedAt, setPublishedAt] = useState("");

    const [expiryDate, setExpiryDate] = useState("");

    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    useEffect(() => {
        if (!form) return;

        setTitle(form.title);

        setDescription(form.description || "");

        setVisibility(form.visibility);

        setIsPasswordProtected(form.isPasswordProtected);

        setStatus(form.status);

        setResponseLimit(form.responseLimit ? String(form.responseLimit) : "");

        setPublishedAt(form.publishedAt ? new Date(form.publishedAt).toISOString().slice(0, 16) : "");

        setExpiryDate(form.expiryDate ? new Date(form.expiryDate).toISOString().slice(0, 16) : "");
    }, [form]);

    const handleSubmit = async () => {

        if (!isPasswordProtected) {

            await updateFormPasswordAsync({ formId, isPasswordProtected: false, });
        }

        await updateFormAsync({
            formId,

            title,

            description,

            visibility,

            isPasswordProtected,

            publishedAt: publishedAt ? new Date(publishedAt) : null,

            expiryDate: expiryDate ? new Date(expiryDate) : null,

            responseLimit: responseLimit ? Number(responseLimit) : null,

            status,
        });
    };

    const handleUpdatePassword = async () => {
        await updateFormPasswordAsync({
            formId,

            isPasswordProtected,

            password,
        });

        setPassword("");

        setIsPasswordModalOpen(false);
    };

    // const handleToggleProtection = async (checked: boolean) => {
    //     setIsPasswordProtected(checked);

    //     // Remove password
    //     if (!checked) {
    //         await updateFormPasswordAsync({
    //             formId,
    //             isPasswordProtected: false,
    //         });
    //     }
    // };

    const handleToggleProtection =
        (
            checked: boolean
        ) => {

            setIsPasswordProtected(
                checked
            );
        };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-100">
                <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-6 py-4 shadow-sm">
                    <Loader2 className="h-5 w-5 animate-spin text-zinc-700" />

                    <p className="text-sm font-medium text-zinc-700">Loading settings...</p>
                </div>
            </div>
        );
    }

    if (error || !form) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">
                <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 text-red-600">
                        <AlertCircle className="h-6 w-6" />

                        <h2 className="text-lg font-semibold">Failed to load form</h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-100 p-4 md:p-8">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Form Settings</h1>

                        <p className="mt-2 text-sm text-zinc-600">
                            Manage visibility, publishing, security and response limits
                        </p>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>

                <div className="grid gap-6">
                    {/* General */}
                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="rounded-2xl bg-zinc-100 p-3 text-zinc-700">
                                <BarChart3 className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-zinc-900">General Information</h2>

                                <p className="text-sm text-zinc-500">Basic details about your form</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Form Title</label>

                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Description</label>

                                <textarea
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Visibility */}
                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="rounded-2xl bg-zinc-100 p-3 text-zinc-700">
                                <Globe className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-zinc-900">Visibility & Status</h2>

                                <p className="text-sm text-zinc-500">Control who can access your form</p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Visibility</label>

                                <select
                                    value={visibility}
                                    onChange={(e) => setVisibility(e.target.value as typeof visibility)}
                                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                                >
                                    <option value="PUBLIC">Public</option>

                                    <option value="UNLISTED">Unlisted</option>

                                    <option value="PRIVATE">Private</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Status</label>

                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as typeof status)}
                                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                                >
                                    <option value="DRAFT">Draft</option>

                                    <option value="PUBLISHED">Published</option>

                                    <option value="ARCHIVE">Archive</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="rounded-2xl bg-zinc-100 p-3 text-zinc-700">
                                <Shield className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-zinc-900">Security</h2>

                                <p className="text-sm text-zinc-500">Protect your form with password</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-center justify-between rounded-2xl border border-zinc-200 p-4">
                                <div>
                                    <h3 className="font-medium text-zinc-900">Password Protection</h3>

                                    <p className="mt-1 text-sm text-zinc-500">
                                        Require password before accessing form
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    checked={isPasswordProtected}
                                    onChange={(e) => handleToggleProtection(e.target.checked)}
                                    className="h-5 w-5 accent-black"
                                />
                            </div>

                            {isPasswordProtected && (
                                <div>
                                    <button
                                        onClick={() => setIsPasswordModalOpen(true)}
                                        className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
                                    >
                                        Update Password
                                    </button>
                                    {/* <label className="mb-2 block text-sm font-medium text-zinc-700">Password</label> */}

                                    {/* <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                  /> */}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Publishing */}
                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="rounded-2xl bg-zinc-100 p-3 text-zinc-700">
                                <Calendar className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-zinc-900">Publishing Settings</h2>

                                <p className="text-sm text-zinc-500">Control publish dates and limits</p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Publish Date</label>

                                <input
                                    type="datetime-local"
                                    value={publishedAt}
                                    onChange={(e) => setPublishedAt(e.target.value)}
                                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Expiry Date</label>

                                <input
                                    type="datetime-local"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-zinc-700">
                                    Response Limit
                                </label>

                                <input
                                    type="number"
                                    value={responseLimit}
                                    onChange={(e) => setResponseLimit(e.target.value)}
                                    placeholder="Unlimited"
                                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                                />
                            </div>
                        </div>
                    </div>

                    <UpdatePasswordModal

                        open={
                            isPasswordModalOpen
                        }

                        password={password}

                        setPassword={
                            setPassword
                        }

                        isPending={
                            isUpdatingPassword
                        }

                        isSuccess={
                            isPasswordUpdated
                        }

                        error={
                            passwordUpdateError
                        }

                        onClose={() =>
                            setIsPasswordModalOpen(
                                false
                            )
                        }

                        onSave={
                            handleUpdatePassword
                        }
                    />

                    {/* Alerts */}
                    {updateError && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                            {updateError.message}
                        </div>
                    )}

                    {isSuccess && (
                        <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
                            Form settings updated successfully
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
