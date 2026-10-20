"use client";

import {
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { siteConfig } from "@/config/site";
import { openingHours } from "@/content/opening-hours";
import { buttonVariantClasses } from "@/lib/button-styles";
import {
  type TimeSlotGroup,
  availableTimeSlots,
  formatHour,
  getZonedIsoDate,
} from "@/lib/opening-hours";
import {
  MAX_GUESTS,
  buildReservationMessage,
  buildWhatsAppUrl,
  readReservationForm,
} from "@/lib/reservation";

export type ReservationOptions = {
  intro?: string;
  presetToday?: boolean;
};

type ReservationContextValue = {
  openReservation: (options?: ReservationOptions) => void;
};

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function useReservation(): ReservationContextValue | null {
  return useContext(ReservationContext);
}

const fieldClasses =
  "mt-2 block w-full rounded-2xl border-2 border-verde-profundo/70 bg-white/50 px-4 py-3 text-base " +
  "transition-colors focus:border-verde-profundo";

const labelClasses = "block text-sm font-semibold";

export function ReservationProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [intro, setIntro] = useState<string | undefined>(undefined);
  const [minDate, setMinDate] = useState<string | undefined>(undefined);
  const [date, setDate] = useState("");
  const [slotGroups, setSlotGroups] = useState<TimeSlotGroup[]>([]);
  const titleId = useId();
  const slotsHintId = useId();

  const selectDate = useCallback((isoDate: string) => {
    setDate(isoDate);
    setSlotGroups(isoDate ? availableTimeSlots(openingHours, isoDate, new Date()) : []);
  }, []);

  const openReservation = useCallback(
    (options: ReservationOptions = {}) => {
      const today = getZonedIsoDate(new Date());
      setIntro(options.intro);
      setMinDate(today);
      if (options.presetToday) selectDate(today);
      dialogRef.current?.showModal();
      nameInputRef.current?.focus();
    },
    [selectDate],
  );

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    selectDate(event.currentTarget.value);
  };

  const hasSlots = slotGroups.length > 0;

  const close = () => dialogRef.current?.close();

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const request = readReservationForm(new FormData(event.currentTarget), intro);
    const url = buildWhatsAppUrl(
      siteConfig.contact.whatsappNumber,
      buildReservationMessage(request, siteConfig.name),
    );

    const whatsappWindow = window.open(url, "_blank");
    if (whatsappWindow) {
      whatsappWindow.opener = null;
    } else {
      window.location.assign(url);
    }

    formRef.current?.reset();
    selectDate("");
    close();
  };

  const contextValue = useMemo(() => ({ openReservation }), [openReservation]);

  return (
    <ReservationContext.Provider value={contextValue}>
      {children}

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={handleBackdropClick}
        data-surface="creme"
        className={
          "painel-reserva m-auto max-h-[92dvh] w-[min(34rem,calc(100%_-_2rem))] max-w-none overflow-y-auto rounded-folha bg-surface p-0 text-ink backdrop:bg-verde-profundo/70 " +
          "max-sm:mb-0 max-sm:max-h-[90dvh] max-sm:w-full max-sm:rounded-b-none max-sm:rounded-t-[2rem]"
        }
      >
        <div aria-hidden="true" className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-ink/20 sm:hidden" />
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="font-display text-3xl leading-tight">
              Vamos reservar sua mesa
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="-mr-2 -mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-ink/10"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="size-5">
                <path className="traco-marca" d="M6 6 L18 18 M18 6 L6 18" />
              </svg>
            </button>
          </div>

          <p className="mt-3 leading-relaxed">
            Preencha os dados e a mensagem chega pronta no WhatsApp.
          </p>
          {intro && (
            <p className="mt-4 rounded-2xl bg-verde-profundo/8 px-4 py-3 text-sm">
              <span className="font-semibold text-emphasis">Seu interesse: </span>
              {intro}
            </p>
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className={`${labelClasses} sm:col-span-2`}>
              Seu nome
              <input ref={nameInputRef} name="name" type="text" required autoComplete="name" maxLength={80} className={fieldClasses} />
            </label>
            <label className={labelClasses}>
              Data
              <input
                name="date"
                type="date"
                required
                min={minDate}
                value={date}
                onChange={handleDateChange}
                className={fieldClasses}
              />
            </label>
            <label className={labelClasses}>
              Horário
              <select
                key={date}
                name="time"
                required
                defaultValue=""
                aria-describedby={date && !hasSlots ? slotsHintId : undefined}
                className={fieldClasses}
              >
                <option value="" disabled>
                  {!date ? "Escolha a data primeiro" : hasSlots ? "Selecione" : "Sem horários"}
                </option>
                {slotGroups.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.slots.map((slot) => (
                      <option key={slot} value={slot}>
                        {formatHour(slot)}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
            {date && !hasSlots && (
              <p id={slotsHintId} role="status" className="text-sm sm:col-span-2">
                Não temos horários disponíveis nesta data. Que tal escolher outro dia?
              </p>
            )}
            <label className={labelClasses}>
              Pessoas
              <input
                name="guests"
                type="number"
                required
                min={1}
                max={MAX_GUESTS}
                defaultValue={2}
                inputMode="numeric"
                className={fieldClasses}
              />
            </label>
            <label className={labelClasses}>
              Ocasião <span className="font-normal">(opcional)</span>
              <input name="occasion" type="text" maxLength={80} list="ocasioes" className={fieldClasses} />
              <datalist id="ocasioes">
                <option value="Aniversário" />
                <option value="Encontro a dois" />
                <option value="Comemoração em família" />
                <option value="Almoço de negócios" />
              </datalist>
            </label>
            <label className={`${labelClasses} sm:col-span-2`}>
              Observações <span className="font-normal">(opcional)</span>
              <textarea
                name="notes"
                rows={3}
                maxLength={280}
                placeholder="Ex.: restrições alimentares, pedidos especiais"
                className={fieldClasses}
              />
            </label>
          </div>

          <button type="submit" className={`${buttonVariantClasses.primary} mt-8 w-full`}>
            Continuar no WhatsApp
          </button>
          <p className="mt-4 text-center text-sm">
            Sua reserva é confirmada pela nossa equipe no WhatsApp.
          </p>
        </form>
      </dialog>
    </ReservationContext.Provider>
  );
}
