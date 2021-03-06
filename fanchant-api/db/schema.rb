# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_09_061407) do

  create_table "analytics", force: :cascade do |t|
    t.string "device_id"
    t.string "url"
    t.string "event"
    t.string "device_type"
    t.string "extra"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "load_time", default: 0
    t.integer "exit_time", default: 0
    t.integer "time_spent", default: 0
  end

  create_table "chant_events", force: :cascade do |t|
    t.integer "chant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "state", default: 0
    t.integer "next_line", default: 0
    t.integer "scheduled_for"
    t.index ["chant_id"], name: "index_chant_events_on_chant_id"
  end

  create_table "chants", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "timelapse"
    t.integer "version", default: 2
    t.integer "length", default: 0
  end

end
