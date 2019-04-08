<template>
  <div>
    <div class="modal-backdrop fade show"></div>
    <div
      class="modal fade show d-block"
      role="dialog"
    >
      <div
        class="modal-dialog modal-md"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ modalTitle }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="onClickCancelBtn"
            >
              <span aria-hidden="true">
                &times;
              </span>
            </button>
          </div>
          <div class="modal-body">
            <form
              class="needs-validation"
              :class="{ 'was-validated': validation.wasValidated }"
            >
              <div class="row">
                <div class="col-10 m-auto">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">
                      Title
                    </label>
                    <div class="col-sm-9">
                      <input
                        id="title"
                        ref="titleInput"
                        type="text"
                        class="form-control"
                        placeholder="Add title..."
                        :value="reminder.title"
                        required
                        maxLength="30"
                        @change="onChangeTitleInput"
                      />
                      <template v-if="!validation.fields.title">
                        <div class="invalid-feedback">
                          Please add a title for this entry.
                        </div>
                      </template>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Date / Time</label>
                    <div class="col-sm-9">
                      <DateInputSelector
                        :selected-dt="reminder.dt"
                        @change="onChangeDateInput"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label
                      htmlFor="staticEmail"
                      class="col-sm-3 col-form-label"
                    >
                      Color
                    </label>
                    <div class="col-sm-9">
                      <multiselect
                        :options="$options.COLORS"
                        :value="selectedColor"
                        label="label"
                        track-by="value"
                        placeholder="Search color..."
                        @input="onChangeColorInput"
                      >
                        <template
                          slot="singleLabel"
                          slot-scope="props"
                        >
                          <span class="option__desc">
                            <span class="option__title">
                              {{ props.option.label }}
                            </span>
                          </span>
                        </template>

                        <template
                          slot="option"
                          slot-scope="props"
                        >
                          <span
                            class="option__dot"
                            :style="{ 'background-color': props.option.value }"
                          ></span>
                          <div class="option__desc">
                            <span class="option__title">
                              {{ props.option.label }}
                            </span>
                          </div>
                        </template>
                      </multiselect>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary font-weight-bold"
              @click="onClickCancelBtn"
            >
              Cancel
            </button>

            <button
              v-if="reminder && reminder.id"
              type="button"
              class="btn btn-danger font-weight-bold"
              @click="onClickDeleteBtn"
            >
              Delete
            </button>

            <button
              type="button"
              class="btn btn-primary font-weight-bold"
              @click="onClickSaveBtn"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import DateInputSelector from './DateInputSelector.vue';
import { COLORS } from '../constants/consts';
import { getDummyReminder } from '../utils/reminder';

export default {
  name: 'ReminderFormModal',

  components: { DateInputSelector, Multiselect },

  props: {
    value: {
      required: true,
      type: Object,
      default: () => getDummyReminder(),
    },
  },

  data() {
    return {
      reminder: {
        ...this.value,
        dt: new Date(this.value.dt),
      },
      validation: {
        wasValidated: false,
        hasErrors: false,
        fields: {
          title: true,
        },
      },
    };
  },

  COLORS,

  computed: {
    modalTitle() {
      return `${this.reminder && this.reminder.id ? 'Edit' : 'Add'} Reminder`;
    },

    selectedColor() {
      return COLORS.find(c => this.reminder.color === c.value);
    },
  },

  mounted() {
    this.$refs.titleInput.focus(); // auto-focus the title input.
  },

  methods: {
    validateFields() {
      let hasErrors = false;
      const fields = { ...this.validation.fields };

      if (!this.reminder.title.trim().length) {
        fields.title = false;
        hasErrors = true;
      }

      this.validation = {
        ...this.validation,
        fields,
        wasValidated: true,
      };

      return !hasErrors;
    },

    onClickCancelBtn() {
      this.$emit('cancel');
    },

    onClickSaveBtn() {
      if (this.validateFields()) {
        this.$emit('submit', this.reminder);
      }
    },

    onClickDeleteBtn() {
      this.$emit('delete', this.reminder);
    },

    onChangeColorInput(color) {
      this.reminder = {
        ...this.reminder,
        color: color.value,
      };
    },

    onChangeDateInput(dt) {
      this.reminder = {
        ...this.reminder,
        dt,
      };
    },

    onChangeTitleInput(event) {
      this.reminder = {
        ...this.reminder,
        title: event.target.value,
      };
    },
  },
};
</script>

<style lang="sass">
  .dot
    height: 10px
    width: 10px
    background-color: #bbb
    border-radius: 50%
    display: inline-block
</style>
